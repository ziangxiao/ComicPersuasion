import matplotlib.pyplot as plt; plt.rcdefaults()
import numpy as np
import pymc3 as pm
import seaborn as sns

from numpy import genfromtxt
# all_data = genfromtxt('all.csv', delimiter=',')
# pos_data = genfromtxt('pos.csv', delimiter=',')
# neg_data = genfromtxt('neg.csv', delimiter=',')
all_data = genfromtxt('all_data2.csv', delimiter=',')
pos_data = genfromtxt('pos2.csv', delimiter=',')
neg_data = genfromtxt('neg2.csv', delimiter=',')


'''
objects = ('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10')
objects2 = ('-5', '-4', '-3', '-2','-1', '0', '1', '2', '3', '4', '5')
y_pos = np.arange(len(objects2))
performance2 = [0,1,7,11,12,23,16,17,9,4,4]
performance3 = [0,1,4,8,4,15,14,16,9,3,4]
performance = [0,0,3,3,8,8,2,1,0,1,0]
performance4 = [1,2,8,18,17,9,19,20,17,8,11]
plt.bar(y_pos, performance4, align='center', alpha=1)
plt.xticks(y_pos, objects2)
plt.ylabel('Freq')
plt.title('Score Distribution')
'''
# s = np.random.uniform(-5,5,1000)
# count, bins, ignored = plt.hist(my_data, 15, normed=True)
# plt.plot(bins, np.ones_like(bins), linewidth=2, color='r')
# with pm.Model() as model:
#     mu = pm.Normal('mu', 0, 1)
#     sigma = 1.
#     returns = pm.Normal('returns', mu=mu, sd=sigma, observed=my_data)
#
#     step = pm.NUTS()
#     trace = pm.sample(15000, step)
# ppc = pm.sample_ppc(trace, samples=500, model=model, size=100)
#sns.distplot(trace[-5000:]['mu'], label='PyMC3');
# plt.legend()
# plt.show()

#pm.traceplot(trace)


# with pm.Model() as model:
#     mu = pm.Normal('mu', mu=0, sd=1, testval=0)
#     sd = pm.HalfNormal('sd', sd=1)
#     n = pm.Normal('n', mu=mu, sd=sd, observed=all_data)
#
#     trace = pm.sample(5000)
# pm.traceplot(trace)
# ppc = pm.sample_ppc(trace, samples=500, model=model, size=100)
# ax = plt.subplot()
# sns.distplot([n.mean() for n in ppc['n']], kde=False, ax=ax)
# ax.axvline(all_data.mean())
# ax.set(title='Posterior predictive of the mean', xlabel='mean(x)', ylabel='Frequency');
# plt.show()

# with pm.Model() as model:
#     mu = pm.Normal('mu', mu=0, sd=1, testval=0)
#     sd = pm.HalfNormal('sd', sd=1)
#     n = pm.Normal('n', mu=mu, sd=sd, observed=pos_data)
#
#     trace = pm.sample(5000)
# pm.traceplot(trace)
# ppc = pm.sample_ppc(trace, samples=500, model=model, size=100)
# ax = plt.subplot()
# sns.distplot([n.mean() for n in ppc['n']], kde=False, ax=ax)
# ax.axvline(pos_data.mean())
# ax.set(title='Posterior predictive of the mean', xlabel='mean(x)', ylabel='Frequency');
# plt.show()

with pm.Model() as model:
    mu = pm.Normal('mu', mu=0, sd=1, testval=0)
    sd = pm.HalfNormal('sd', sd=1)
    n = pm.Normal('n', mu=mu, sd=sd, observed=neg_data)

    trace = pm.sample(5000)
pm.traceplot(trace)
ppc = pm.sample_ppc(trace, samples=500, model=model, size=100)
ax = plt.subplot()
sns.distplot([n.mean() for n in ppc['n']], kde=False, ax=ax)
ax.axvline(neg_data.mean())
ax.set(title='Posterior predictive of the mean', xlabel='mean(x)', ylabel='Frequency');
plt.show()
